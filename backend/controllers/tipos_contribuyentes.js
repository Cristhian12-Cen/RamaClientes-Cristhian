const TipoContribuyente = require("../models/tipo_contribuyente");

getTiposContribuyentes = async (req, res) => {
    try {
        const [total, tipos_contribuyentes] = await Promise.all([
            TipoContribuyente.count(),
            TipoContribuyente.findAll()
        ])

        res.json({
            total,
            tipos_contribuyentes
        })
    } catch (error) {
        console.log("Error al obtener tipos de contribuyentes:", error);
        res.status(500).json({ msg: 'Hable con el administrador' });
    }
}

module.exports = {
    getTiposContribuyentes
}