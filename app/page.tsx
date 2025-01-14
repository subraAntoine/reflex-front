import Classement from "./_components/classement/page";
export default function Home() {
  return (
    <div className="container display flex flex-col items-center justify-center">
      <h1 className="title text-3xl font-bold mt-12 mb-12">Classement</h1>
      <Classement></Classement>
      
    </div>
  );
}
