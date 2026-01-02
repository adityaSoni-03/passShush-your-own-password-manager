"use client";
import AddIcon from "@/components/addIcon";
import CopyIcon from "@/components/copyIcon";
import DeleteIcon from "@/components/deleteIcon";
import EditIcon from "@/components/editIcon";
import React, { useDebugValue, useEffect, useState } from "react";

import { Bounce, toast, ToastContainer } from "react-toastify";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { stat } from "fs";


type PasswordItem = {
  id: string;
  website: string;
  username: string;
  password: string;
};

export default async function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if(status === "loading"){
    return <div>Loading...</div>;
  }

 
  const [items, setItems] = useState<PasswordItem[]>([]);
  const [form, setForm] = React.useState({
    website: "",
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);
  async function loadPasswords() {
    const res = await fetch("/api/passwords");
    const data = await res.json();
    setItems(data);
  }




  const savepassword = (e: any) => {
    e.preventDefault();
    if (!form.website || !form.username || !form.password) {
      toast.error("Please fill all the fields", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,

      });
      return;

    }
    fetch('api/passwords', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(form),
    },).then((res) => res.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    setForm({ website: "", username: "", password: "" });

    loadPasswords();
    toast.success("Password saved successfully!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });



  };
  useEffect(() => {
    loadPasswords();
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleDelete = (id: any) => {

    const res = window.confirm("Are you sure you want to delete this password?");
    if (!res) {
      return;
    }
    fetch(`/api/passwords?id=${id}`, {
      method: 'DELETE',
    }).then((res) => res.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    setItems(items.filter(item => item.id !== id));

    toast.warn("Password deleted !", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };
  const handleEdit = (id: any) => {
    const item = items.find(item => item.id === id);
    if (item) {
      setForm({ website: item.website, username: item.username, password: item.password });
      handleDelete(id);

    }

  }
  const handleCopy = (text: string) => {
    toast("Copied to clipboard!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>

      <ToastContainer position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce} />

      <div className="md:container md:px-2 bg-gray w-300 h-100 rounded-xl mt-5  flex  text-center flex-col">
        <div className="flex items-center select-none flex-col">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            <a href="/" className="hover:cursor-pointer">

              <span className="text-black">pass</span>
              <span className="italic bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                Shush
              </span>
            </a>

            <span className="ml-2 text-purple-400 text-xl animate-pulse">•</span>
          </h1>

          {/* shush dot */}

          <p className="text-gray-600 text-xl">Your own password manager!</p>
        </div>
        <div className="flex flex-col h-50 justify-center mt-5 mb-5  ">
          <label className="text-black">Enter website URL</label>
          <input value={form.website} onChange={handleChange} name="website" className="text-black ml-88 p-1 transition-all duration-200 border-2 bg-white hover:border-purple-500 ml-48 w-203 h-10  border-black rounded-2xl" placeholder="www.website.com" type="url" id="website" />
          <div className="flex mt-5 justify-center gap-3 ">

            <input value={form.username} onChange={handleChange} name="username" className="text-black p-1 transition-all duration-200 border-2 bg-white hover:border-purple-500  w-100  h-10 border-black rounded-2xl" placeholder="Enter username" id="username" />
            <div className="relative">
              <input id="password"
                value={form.password}
                onChange={handleChange}
                name="password"
                type={showPassword ? "text" : "password"}
                className="text-black p-1 bg-white transition-all duration-200 border-2 hover:border-purple-500 w-100 h-10 border-black rounded-2xl"
                placeholder="Enter password"
              />

              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <img
                  src={showPassword ? "/eye-open.png" : "/closed-eyes.png"}
                  className="h-9 w-9"
                  alt="toggle password"
                />
              </button>
            </div>


          </div>

        </div>
        <button onClick={savepassword} className="bg-purple-500 ml-124 w-50 mb-5 flex justify-center items-center    text-black font-bold rounded-3xl p-3  hover:cursor-pointer transition-all duration-300 shadow hover:-translate-y-2 hover:shadow-2xl hover:bg-purple-300">Save password<AddIcon /></button>

        <div className="md:mt-3">

          <h1 className="text-black mb-3 relative w-70 text-xl font-bold">Your passwords</h1>
          {items.length === 0 && <div>No passwords to show</div>}
          {items.length > 0 && <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-xl border border-default">
            <table className="w-full  text-sm text-left rtl:text-right text-body">
              <thead className="text-sm text-center  bg-purple-500 text-white text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                <tr>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Website
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    password
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Actions
                  </th>

                </tr>
              </thead>
              {items.map((item, index) => (
                <tbody className="bg-purple-200 text-center">

                  <tr key={index} className="bg-neutral-primary w-full border-b border-default">
                    <th scope="row" className=" py-4 flex justify-center items-center font-medium text-heading whitespace-nowrap">
                      <a href={item.website} target="_blank" rel="noopener noreferrer">{item.website}</a>
                      <div onClick={() => handleCopy(item.website)}>
                        <CopyIcon />
                      </div>
                    </th>
                    <td className="px-2 py-4 ">
                      <div className="flex justify-center items-center">
                        {item.username}
                        <div onClick={() => handleCopy(item.username)}>
                          <CopyIcon />
                        </div>

                      </div>

                    </td>
                    <td className="px-4 py-4 ">
                      <div className="flex justify-center items-center">
                        {item.password}
                        <div onClick={() => handleCopy(item.password)}>

                          <CopyIcon />
                        </div>

                      </div>
                    </td>
                    <td className="px-4 py-4 ">
                      <div className="flex justify-center items-center gap-3">
                        <div onClick={() => handleEdit(item.id)}>
                          <EditIcon />
                        </div>
                        <div onClick={() => handleDelete(item.id)}>

                          <DeleteIcon />

                        </div>
                      </div>



                    </td>

                  </tr>

                </tbody>
              ))}

            </table>
          </div>}


        </div>
      </div>
    </>
  );
}


