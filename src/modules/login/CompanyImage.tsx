function CompanyImage() {
  return (
      <img
        src={import.meta.env.VITE_PUBLIC_COMPANY_IMAGE}
        alt="Company Logo"
        className="w-full h-full object-cover bg-black"
        style={{ filter: "brightness(20%)" }}
      />
  );
}

export default CompanyImage;
