from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/andean.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.Integer, db.ForeignKey('category.id'), unique=False, nullable=True)
    color = db.Column(db.String(80), unique=False, nullable=False)
    name = db.Column(db.String(80), unique=False, nullable=True)
    price = db.Column(db.Float, unique=False, nullable=True)
    details = db.Column(db.String(160), unique=False, nullable=True)
    image = db.Column(db.String(160), unique=False, nullable=True)

    def __repr__(self):
        categoryToSub = db.session.query(Category.name, Category.sub_category).filter_by(id=self.category).first()
        subCategory = db.session.query(SubCategory.name).filter_by(id=categoryToSub[1]).first()
        return 'Name: %r, Category: %r, SubCategory: %r, Color: %r, Price: %.2f, Details: %r\n' %\
               (self.name, categoryToSub[0], subCategory[0], self.color, self.price, self.details)


class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sub_category = db.Column(db.Integer, db.ForeignKey('sub_category.id'))
    name = db.Column(db.String(80), nullable=True)

    db.UniqueConstraint(sub_category, name)

    def __repr__(self):
        return '<Category %r>' % self.name


class SubCategory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=True)

    def __repr__(self):
        return '<Sub-Category %r>' % self.name
