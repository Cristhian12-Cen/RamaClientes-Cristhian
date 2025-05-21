const TipoDocumento = require("../models/tipo_documento");

 getTiposDocumentos=async (req, res) => {
    try {
        const [total, tipos_documentos] = await Promise.all([
            TipoDocumento.count(),
            TipoDocumento.findAll()
        ])

        res.json({
            total,
            tipos_documentos
        })
    } catch (error) {
        console.log("Error al obtener tipos de documentos:", error);
        res.status(500).json({ msg: 'Hable con el administrador' });
    }
}

module.exports = {
    getTiposDocumentos
}