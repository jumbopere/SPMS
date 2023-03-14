export default function timestamp(schema) {
    // Add the two fields to the schema
    schema.add({
      createdAt: String,
      updatedAt: String,
    });
  
    // eslint-disable-next-line func-names
    schema.pre('save', function (next) {
      const now = new Date().toLocaleString();
      this.updatedAt = now;
      this.createdAt = now;
      next();
    });
  }
  