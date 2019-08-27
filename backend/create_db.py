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

    def __repr__(self):
        return '<User %r>' % self.name


class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sub_category = db.Column(db.Integer, db.ForeignKey('cat_to_sub.id'), unique=True)
    name = db.Column(db.String(80), unique=False, nullable=True)

    def __repr__(self):
        return '<Category %r>' % self.name


class CatToSub(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fk_sub_category = db.Column(db.ForeignKey('sub_category.id'), unique=False, nullable=True)

    def __repr__(self):
        return '<Category: %r Sub-Category: %r>' % (self.id, self.fk_sub_category)


class SubCategory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=True)

    def __repr__(self):
        return '<Sub-Category %r>' % self.name


db.drop_all()
db.create_all()

db.session.add(SubCategory(name='big'))
fk_sub_cat = db.session.query(SubCategory.id).filter_by(name='big').first()[0]
db.session.add(CatToSub(fk_sub_category=fk_sub_cat))
fk_cat_to_sub = db.session.query(CatToSub.id).filter_by(fk_sub_category=fk_sub_cat).first()[0]
db.session.add(Category(sub_category=fk_cat_to_sub, name='necklace'))
fk_cat = db.session.query(Category.id).filter_by(name='necklace').first()[0]
db.session.add(Product(category=fk_cat, color="black", name="Peruvian Necklace", price=15.50,
                       details="It's pretty and will last you years."))

print(CatToSub.query.all())
print(Category.query.all())
print(SubCategory.query.all())
print(Product.query.all())
