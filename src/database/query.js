export const queries = {
    getAllProducts: 'SELECT * FROM Products' ,
    getProductByID: 'SELECT * FROM Products WHERE Id = @Id' ,
    addNewProduct: 'INSERT INTO Products (name, description, quantity) VALUES (@name, @description, @quantity)' ,
    deleteProduct: 'DELETE FROM [SQL_apiREST].[dbo].[Products] WHERE Id = @Id' ,
    getTotalProducts: 'SELECT COUNT(*) FROM Products' ,
    updateProductById: 'UPDATE Products SET Name = @name, Description = @description, Quantity = @quantity WHERE Id = @Id'
}

