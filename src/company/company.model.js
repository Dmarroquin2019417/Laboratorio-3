import mongoose from 'mongoose';

const EmpresaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    nivelImpacto: {
        type: String,
        required: [true, 'El nivel de impacto es obligatorio']
    },
    añosTrayectoria: {
        type: Number,
        required: [true, 'Los años de trayectoria son obligatorios']
    },
    categoriaEmpresarial: {
        type: String,
        required: [true, 'La categoría empresarial es obligatoria']
    },
    estado: {
        type: Boolean,
        default: true,
      },
});

// Opcionalmente, puedes definir un método toJSON personalizado para formatear la salida JSON
EmpresaSchema.methods.toJSON = function () {
    const { __v, ...empresa } = this.toObject();
    return empresa;
};

export default mongoose.model('Empresa', EmpresaSchema);
