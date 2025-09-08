"use client";
import TableComponent from "./Components/Table/Table";

export default function Home() {
  return (
    <div className=" h-screen flex flex-col justify-center gap-4 lg:px-9 px-2 ">  
      <h1 className="text-start  py-5 text-2xl font-bold">My Customers</h1>
      <TableComponent />
    </div>
  );
}
