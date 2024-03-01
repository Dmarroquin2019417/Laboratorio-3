import mongoose from 'mongoose';

const AdminSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
      },
      correo: {
        type: String,
        required: [true, "El correo es obligatorio"],
        unique: true,
      },
      password: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
      },
      role: {
        type: String,
        required: true,
        enum: ["ADMIN_ROLE"],
        default: "ADMIN_ROLE",
      },
      estado: {
        type: Boolean,
        default: true,
      },
    });


AdminSchema.methods.toJSON = function () {
    const { __v, password, _id, ...admin } = this.toObject();
    admin.uid = _id;
    return admin;
  };
  
  export default mongoose.model('Admin', AdminSchema);