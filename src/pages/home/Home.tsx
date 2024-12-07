import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import GetImages from '../../components/GetImages';
import LoggedIn from '../../components/LoggedIn';
import ProfileMenu from './ProfileMenu';
import GetUsername from '../../components/GetUsername';
//import GetFirst100Images from '../../components/GetFirst100Images';

export default function Home() {
  const [images, setImages] = useState<string[]>([]);
  const [isProfileMenuVisible, setProfileMenu] = useState<boolean>(false);
  const [isLogged, setLogged] = useState<boolean>(false);
  const [username, setUsername] = useState<string>();
  //const [images100, setImages100] = useState<string[]>([]);

  useEffect(() => {  
    const handleGetUserData = async () => {
      if(await LoggedIn() == true){ 
        const fetchedImages = await GetImages();
        const fetchedUsername: string = await GetUsername();
        //const fetched100Images = await GetFirst100Images();
        setLogged(true);
        setImages(fetchedImages);
        setUsername(fetchedUsername);
        //setImages100(fetched100Images);
      }
    }; 
    handleGetUserData();
  },[]);
  
  return (
    <>
    {/* disabled the uploaded background images feature, to enable it, remove background from root index.html and enable GetFirst100Images() in components/
    <div className='absolute -z-10 w-screen h-screen bg-dark-blue-gradient'>
      <div className='grid grid-cols-10 grid-rows-10 w-full h-full'>
        {images100.slice(0, 100).map((images100URL, index) => (
          <img
            key={index}
            className='w-full h-full object-cover'
            src={images100URL}
            alt={`${images100URL}-${index}`}
          />
        ))}
      </div>
    </div>
        */}

    <div className='min-h-screen grid grid-rows-[auto_1fr_auto]'>
      <header>
        <nav className='flex justify-between mt-5 mx-8 sm:mt-12 sm:mx-12'>
          <Link to="/">
            <img 
              className='h-10 shadow-xl' 
              src="../images/archive-icon.png" 
              alt="archive" 
            />
          </Link>
          
          { isLogged ? ( 
            <button
              onClick={() => setProfileMenu(prev => prev = !prev)}
            >
              <img 
                className='h-10 shadow-xl' 
                src="../images/profile-icon.png" 
                alt="login" 
              />
            </button>
          ): (
            <Link to="/login">
              <img 
                className='h-10 shadow-xl' 
                src="../images/profile-icon.png" 
                alt="login" 
              />
            </Link>
          )}
          {isProfileMenuVisible && (<ProfileMenu username={username || ""} />)}
        </nav>
      </header>
      <main className='flex flex-col items-center justify-center'>
        <section className='flex flex-col xs:flex-row items-center justify-center mb-10 md:mb-14'>
          <img className='h-20 sm:h-24 mr-4' src="../images/logo-pixel-post.png" alt="logo" />
          <h1 className='text-2xl md:text-3xl font-extrabold mt-5 md:mt-0'>PIXEL POST</h1>
        </section>
        <Link 
          to="/canvas" 
          className='text-xl md:text-2xl text-center font-semibold py-5 sm:px-20 md:px-28 lg:px-36 w-9/12 sm:w-auto mb-3 md:mb-8 bg-primary-button shadow-xl'>
          start create
        </Link>
        <section className='mt-8 md:mt-16 md:mb-20'>
          <div className='grid grid-cols-3 sm:grid-cols-4 gap-4 md:gap-6 p-4'>

          {images.length > 0 && (
            <>
              {images.slice(0, 7).map((imageURL, index) => (
                <img key={index} className='h-20 md:h-28 shadow-xl' src={imageURL} alt={`${imageURL}-${index}`} />
              ))}
              {images.length > 8 && (
                <div className='h-20 w-auto md:h-28 shadow-xl border-4 border-primary-button flex justify-center items-center'>
                  <p className='w-full h-full flex justify-center items-center text-3xl'>{`+${images.length - 7}`}</p>
                </div>
              )}
            </>
          )}
            
          </div>
        </section>
      </main>
      <footer className='pt-10 md:pt-20'>
        <div className='text-center'>
          <cite className='text-secundary-color-text'>vinifen</cite>
          <img src="" alt="" />
        </div>
      </footer>
    </div>
  </>
  );
}
