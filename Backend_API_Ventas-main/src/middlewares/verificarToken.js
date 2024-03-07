import jwt from 'jsonwebtoken'

export const verificarToken = (req, res, next) => {
   // console.log(req.headers)
    let token
    if (req.header('authorization')) {
        //Para pruebas postman con Bearer Token JWT
        const tokenBearer = req.header('authorization');
        token = tokenBearer.split('Bearer ')[1];
     //   console.log('pos')
    } else if (req.header('cookie')) {
        //Tomar el token de la cookie del navegador 
        const tokenNavegador = req.header('cookie');
        token = tokenNavegador.split('token=')[1];
     //   console.log('no pos')
    }else{
        token = ''
     //   console.log('sin token')
    }

    console.log(token)
    if (!token ) {
        return res.status(401).json({ mensaje: 'Acceso denegado. Token no proporcionado.' });
    }

    try {
        const decoded = jwt.verify(token, 'secret');
        req.usuario = decoded;
        next();
    } catch (error) {
        res.status(400).json({ mensaje: 'Token inválido.' });
    }

}
    
