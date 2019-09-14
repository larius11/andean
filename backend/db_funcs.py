from db_structure import db, SubCategory, Category, Product


def insert_product(category, subCategory, color,
                   name, price, details, image):
    print("Beginning to insert...")
    # Search for subCategory
    fk_sub_cat = db.session.query(SubCategory.id).filter_by(name=subCategory).first()
    if fk_sub_cat is None:
        db.session.add(SubCategory(name=subCategory))
        fk_sub_cat = db.session.query(SubCategory.id).filter_by(name=subCategory).first()
    # Search for Category
    fk_cat = db.session.query(Category.id).filter_by(name=category, sub_category=fk_sub_cat[0]).first()
    if fk_cat is None:
        db.session.add(Category(sub_category=fk_sub_cat[0], name=category))
        fk_cat = db.session.query(Category.id).filter_by(name=category, sub_category=fk_sub_cat[0]).first()
    # Search if Product already exists
    if db.session.query(Product.id).filter_by(category=fk_cat[0], color=color, name=name).first() is not None:
        return False, "Product already exists."
    # Insert product
    db.session.add(Product(category=fk_cat[0], color=color, name=name, price=price, details=details, image=image))
    db.session.commit()
    return True, "Inserted a new Product."


def get_all_products() -> str:
    return Product.query.all()
