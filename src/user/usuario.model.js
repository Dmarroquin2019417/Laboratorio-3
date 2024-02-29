import mongoose from 'mongoose';

const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },

    role: {
        type: String,
        required: true,
        enum: ["ADMIN_ROLE"],
        default: "ADMIN_ROLE"
    },
});

usuarioSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
  };

export default mongoose.model('Usuario', usuarioSchema);