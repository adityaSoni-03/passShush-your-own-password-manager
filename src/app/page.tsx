"use client";
import AddIcon from "@/components/addIcon";
import CopyIcon from "@/components/copyIcon";
import DeleteIcon from "@/components/deleteIcon";
import EditIcon from "@/components/editIcon";
import React from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
export default function Home() {
  const [form, setForm] = React.useState({
    website: "",
    username: "",
    password: "",
  });
  const [passwordArr, setPasswordArr] = React.useState<any[]>([]);
  React.useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArr(JSON.parse(passwords));
    }
  }, []);

  const showPass = (e) => {
    e.preventDefault();
    const passwordInput = document.querySelector('input[type="password"]') as HTMLInputElement;
    if (passwordInput) {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
      } else {
        passwordInput.type = "password";
      }
    }
  };
  const changeImg = (e) => {
    e.preventDefault();
    const imgElement = e.target as HTMLImageElement;
    if (imgElement) {
      if (imgElement.src.includes("eye-open.png")) {
        imgElement.src = "/closed-eyes.png";
      } else {
        imgElement.src = "/eye-open.png";
      }
    }
  };

  const savepassword = (e: any) => {
    e.preventDefault();
    console.log(form);
    if (form.website === "" || form.username === "" || form.password === "") {
      alert("Please fill all the fields");
      return;
    }
    const newPasswordArr = [...passwordArr, form];
    localStorage.setItem("passwords", JSON.stringify(newPasswordArr));
    setPasswordArr(newPasswordArr);


    console.log(passwordArr);

  };
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleDelete = (e: any) => {
    // e.preventDefault();
    // const index = passwordArr.findIndex((item));
    // if (index > -1) {
    //   const newPasswordArr = [...passwordArr];
    //   newPasswordArr.splice(index, 1);
    //   setPasswordArr(newPasswordArr);
    //   localStorage.setItem("passwords", JSON.stringify(newPasswordArr));
    // } else {
    //   alert("Password not found");
    // }
  }
  const handleEdit = (e: any) => {
    e.preventDefault();
  }
  const handleCopy = (text: string) => {
    toast("Copied to clipboard!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    navigator.clipboard.writeText(text);
  };
  return (
    <>

      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div></div>
      <div className="bg-gray w-300 h-100 rounded-xl mt-5  flex  text-center flex-col">
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
          <input value={form.website} onChange={handleChange} name="website" className="text-black p-1 transition-all duration-200 border-2 hover:border-purple-500 ml-48 w-203 h-10  border-black rounded-2xl" placeholder="www.website.com" type="url" />
          <div className="flex mt-5 justify-center gap-3 ">

            <input value={form.username} onChange={handleChange} name="username" className="text-black p-1 transition-all duration-200 border-2 hover:border-purple-500  w-100  h-10 border-black rounded-2xl" placeholder="Enter username" />
            <div className="relative">
              <input value={form.password} onChange={handleChange} name="password" className="text-black p-1 transition-all duration-200 border-2 hover:border-purple-500  w-100  h-10 border-black rounded-2xl" placeholder="Enter password" type="password" />
              <span className="absolute text-white right-2 hover:cursor-pointer transition-all duration-200" onClick={showPass}><img src="/eye-open.png" onClick={changeImg} className="h-9 w-9 m-0.5 transition-all duration-200"></img></span>
            </div>

          </div>

        </div>
        <button onClick={savepassword} className="bg-purple-600 ml-124 w-50 mb-5 flex justify-center items-center    text-black font-bold rounded-3xl p-3  hover:cursor-pointer transition-all duration-300 shadow hover:-translate-y-2 hover:shadow-2xl hover:bg-purple-400">Add password  <AddIcon /></button>

        <div className="mt-3">

          <h1 className="text-black mb-3 relative w-70 text-xl font-bold">Your saved passwords</h1>
          {passwordArr.length === 0 && <div>No passwords to show</div>}
          {passwordArr.length > 0 && <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-xl border border-default">
            <table className="w-full  text-sm text-left rtl:text-right text-body">
              <thead className="text-sm text-center  bg-purple-600 text-white text-body bg-neutral-secondary-soft border-b rounded-base border-default">
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
              {passwordArr.map((item, index) => (
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
                          <CopyIcon />
                        </div>

                      </div>
                    </td>
                    <td className="px-4 py-4 ">
                      <div className="flex justify-center items-center gap-3">
                        <div onClick={handleEdit}>
                          <EditIcon />
                        </div>
                        <div onClick={() => handleDelete(index)}>
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
