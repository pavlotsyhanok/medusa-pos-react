import CompanyImage from "./CompanyImage";

export const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-screen w-full">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/85"></div>
        <CompanyImage />
      </div>
      <div className="relative z-10 flex items-center justify-center h-full">
        {children}
      </div>
    </div>
  );
};