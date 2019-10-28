from db_structure import db, SubCategory, Category, Product
from images.download import download_picture

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


def get_specific_product(product, category, subCategory, color):
    selectedSubCategory = SubCategory.query.with_entities(SubCategory.id).filter(SubCategory.name == subCategory).first()[0]
    selectedCategory = Category.query.with_entities(Category.id).filter(Category.name == category, Category.sub_category == selectedSubCategory).first()[0]
    return Product.query.with_entities(Product.details, Product.price, Product.image).filter(Product.category == selectedCategory, Product.name == product, Product.color == color).first()


def get_all_categories():
    return Category.query.with_entities(Category.name).all()


def get_all_sub_categories():
    return SubCategory.query.with_entities(SubCategory.name).all()


def get_some_products(category, subCategory):
    selectedSubCategory = SubCategory.query.with_entities(SubCategory.id).filter(SubCategory.name == subCategory).first()[0]
    selectedCategory = Category.query.with_entities(Category.id).filter(Category.name == category, Category.sub_category == selectedSubCategory).first()[0]
    return Product.query.with_entities(Product.name).filter(Product.category == selectedCategory).all()


def get_some_colors(product, category, subCategory):
    selectedSubCategory = SubCategory.query.with_entities(SubCategory.id).filter(SubCategory.name == subCategory).first()[0]
    selectedCategory = Category.query.with_entities(Category.id).filter(Category.name == category, Category.sub_category == selectedSubCategory).first()[0]
    return Product.query.with_entities(Product.color).filter(Product.category == selectedCategory, Product.name == product).all()


def get_all_products():
    return Product.query.all()


def get_images():
    products = get_all_products()
    id_index = 100
    for product in products:
        download_picture(product.images, id_index)
        id_index = id_index + 1
    return not(id_index > 999)


def get_csv():
    csv = 'ID,Type,Name,Published,"Is featured?","Visibility in catalog","Short description",Description,"Tax status","In stock?","Backorders allowed?","Sold individually?","Allow customer reviews?","Regular price",Categories,Images,Position\n'
    products = get_all_products()
    id_index = 100
    for product in products:
        newline = '' + id_index + ',single,"' + product.name + '",1,0,visible,"Short Description","' + product.details + '",taxable,1,0,1,1,' + product.price + ',"' + Category.query.with_entities(Category.name).filter(Category.id == product.category).frist()[0]+'",' + product.image + ',0\n'
        csv = csv + newline
    return csv
