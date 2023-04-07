import { getConnection, sql, queries } from "../database"

//SELECCIONAR TODOS LOS REGISTROS
export const getProducts = async(req,res) => {
    try {
        const pool = await getConnection() ;
        const result = await pool.request() 
        .query(queries.getAllProducts) ;
        console.log(result) ;
        res.json(result.recordset)
    } catch (error) {
        res.status(500) ;
        res.send(error.message) ;
    }

}

//SELECCIONAR PRODUCTO POR ID
export const getProductByID = async(req,res) => {
    const { id } = req.params ;

    const pool = await getConnection() ;
    const result =await pool.request()
    .input("Id", id)
    .query(queries.getProductByID)

    console.log(result) ;
    res.send(result.recordset[0])

}

//OBTENER EL NÚMERO DE PRODUCTOS
export const getTotalProducts = async(req,res) => {

    const pool = await getConnection() ;
    const result = await pool.request()
    .query(queries.getTotalProducts) ;

    res.json(result.recordset[0][''])
}

//ELIMINAR REGISTRO
export const deleteProductById = async(req,res) => {
    const { id } = req.params ;

    const pool = await getConnection() ;
    const result = await pool.request()
    .input("Id", id)
    .query(queries.deleteProduct)

    res.sendStatus(204) 
}


//INSERTAR REGISTRO
export const createNewProduct = async(req,res) => {
    const { name, description } = req.body ;
    let { quantity } = req.body ;

    
    if (name == null || description == null) {
        return res.status(400).json({msg: 'Bad request. Plis fill all fields'})
    }
    
    if (!quantity == null) quantity = 0 ;

    try {
        const pool = await getConnection();
        await pool.request()
        .input("name", sql.VarChar, name)
        .input("description", sql.Text, description)
        .input("quantity", sql.Int, quantity)
        .query(queries.addNewProduct) ;
        
        console.log(name, description, quantity)
        res.json({name, description, quantity})
    
    } catch (error) {
        res.status(500) ;
        res.send(error.message) ;
    }

}


// ACTUALIZAR PRODUTO POR ID
export const updateProductById = async(req,res) => {

    const {name, description, quantity} = req.body ;
    const { id } = req.params ;
    if (name == null || description == null, quantity == null) {
        return res.status(400).json({msg: 'Bad request. Plis fill all fields'})
    }

    const pool = await getConnection() 
    await pool.request()
    .input('name', sql.VarChar, name)
    .input('description', sql.Text, description)
    .input('quantity', sql.Int, quantity)
    .input('id', sql.Int, id)
    .query(queries.updateProductById) ;

    res.json({name, description, quantity})
}