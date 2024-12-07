import LoggedIn from "../../components/LoggedIn";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import GetUsername from "../../components/GetUsername";
import EditUsername from "./EditUsername";
import EditPassword from "./EditPassword";
import DeleteAccount from "./DeleteAccount";

function Account() {
  const [isLogged, setLogged] = useState<boolean>(true);
  const [username, setUsername] = useState<string>('');
  const [isSettingsVisible, setSettingsVisible] = useState<boolean>(true);
  const [isEditUsernameVisible, setEditUsernameVisible] = useState<boolean>(false);
  const [isEditPasswordVisible, setEditPasswordVisible] = useState<boolean>(false);
  const [isDeleteAccountVisible, setDeleleAccountVisible] = useState<boolean>(false);

  useEffect(() => {
    const userData = async () => {
      const log = await LoggedIn();
      const name = await GetUsername();
      setUsername(name);
      setLogged(log);
    };
    userData(); // Chame a função que lida com a lógica assíncrona
  }, []);

  const handleEditUsername = () => {
    setSettingsVisible(false);
    setEditUsernameVisible(true);
  }

  const handleEditPassword = () => {
    setSettingsVisible(false);
    setEditPasswordVisible(true);
  }

  const handleDeleteAccount = () => {
    setSettingsVisible(false);
    setDeleleAccountVisible(true);
  }

  const handleReturn = () => {
    setSettingsVisible(true);
    setDeleleAccountVisible(false);
    setEditPasswordVisible(false);
    setEditUsernameVisible(false);
  }

  if(!isLogged) return (
    <div className="h-screen flex justify-center items-center">
      <p className="bg-red-500 px-10 py-20 border-2 border-primary-button text-center">you are not logged</p>
    </div>
  )

  return (
    <>
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <header className="mt-5 mx-8 sm:mt-12 sm:mx-12">
        <Link to="/" className="flex items-center h-10 w-10">
          <img src="./images/back-icon.png" alt="Back to home" className="h-full" />
        </Link>
      </header>
      <main className="flex flex-col justify-start items-center mt-12 lg:mt-20">
        <div className="w-72 xs:w-96 mt-5 md:mt-10">
          <div className="w-full flex flex-col justify-around items-center">
            <div className="items-center mb-5 w-full flex flex-col">
              <img className="h-24 mb-5" src="./images/logo-pixel-post.png" alt="logo" />
              
            </div>
            { isSettingsVisible ? (
              <>
                <h3 className="text-xl font-semibold mb-5">Welcome {username}</h3>
                <button 
                  className="bg-primary-button shadow-xl w-full h-12 flex items-center justify-center mb-5"
                  onClick={handleEditUsername}
                >
                  <p>Edit Username</p>
                </button>
                <button
                  className="bg-primary-button shadow-xl w-full h-12 flex items-center justify-center mb-5"
                  onClick={handleEditPassword}
                >
                  <p>Edit Password</p>
                </button>
                <button
                  className="bg-primary-button shadow-xl w-full h-12 flex items-center justify-center mb-5"
                  onClick={handleDeleteAccount}
                >
                  <p>Delete Account</p>
                </button>
              </>
            ): (
              <>
              {isEditUsernameVisible && (
                <EditUsername oldUsername={username} />
              )}
              {isEditPasswordVisible && (
                <EditPassword/>
              )}
              {isDeleteAccountVisible && (
                <DeleteAccount/>
              )}
              <button 
                className=""
                onClick={handleReturn}
              >Return</button>
              </>
            )} 
          </div>
        </div>         
      </main>
    </div>
    </>
  );
}

export default Account;
