import { Link } from 'react-router-dom';

export default function Home(){
  return ( 
    <div className='min-h-screen grid grid-rows-[auto_1fr_auto]'>
      <header>
        <nav className='flex justify-between mt-6 mx-6'>
          <Link to="/"><img className='h-12 md:h-16 p-1 shadow-xl' src="../images/archive-icon.png" alt="archive"/></Link>
          <Link to="/login"><img className='h-12 md:h-16 p-1 shadow-xl' src="../images/profile-icon.png" alt="login"/></Link>
        </nav>
      </header>
      <main className='flex flex-col items-center justify-center'>
        <section className='flex flex-col md:flex-row items-center justify-center md:mb-14'>
          <img className='h-24 md:h-28 mr-4' src="../images/pixel_post-logo.png" alt="logo" /> 
          <h1 className='text-2xl md:text-3xl font-extrabold mt-5 md:mt-0'>PIXEL POST</h1>
        </section>
        <Link to="/canvas" className='text-xl md:text-2xl text-center font-semibold py-6 sm:px-20 md:px-28 lg:px-36 w-9/12 sm:w-auto mt-6 mb-3 md:mb-8 bg-primary-button shadow-xl'>start create</Link>
        <section className='mt-8 md:mt-16 md:mb-20'>
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 p-4'>
            <img className='h-24 md:h-28  p-1 shadow-xl' src="../images/archive-icon.png" alt="archive"/>
            <img className='h-24 md:h-28 ' src="../images/pixel_post-logo.png" alt="logo" />
            <img className='h-24 md:h-28  p-1 shadow-xl' src="../images/profile-icon.png" alt="login"/>
            <img className='h-24 md:h-28  p-1 shadow-xl' src="../images/archive-icon.png" alt="archive"/>
            {/*<img className='h-24' src="../images/pixel_post-logo.png" alt="logo" />
            <img className='h-24 p-1 shadow-xl' src="../images/profile-icon.png" alt="login"/>
            <img className='h-24 p-1 shadow-xl' src="../images/archive-icon.png" alt="archive"/>
            <img className='h-24' src="../images/pixel_post-logo.png" alt="logo" />*/}
            {/*images*/}
          </div>
        </section>
      </main>
      <footer className=' pt-10 md:pt-20'>
        <div className='text-center'>
          <cite className='text-secundary-color-text'>vinifen</cite>
          <img src="" alt="" />
        </div>
      </footer>
    </div>
  ); 
}


