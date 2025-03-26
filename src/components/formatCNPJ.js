// src/components/formatCNPJ.js

const formatCNPJ = (rawCnpj) => {
  if (!rawCnpj) return "";
  return rawCnpj.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );
};

export default formatCNPJ;
