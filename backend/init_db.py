from db_structure import db, SubCategory

db.create_all()
db.session.add(SubCategory(name='null'))
db.session.commit()
