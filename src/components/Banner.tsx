
const Banner = () => {
  return (
        <div className='w-full max-w-7xl py-4 md:py-8'>
            <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold'>Welcome to Sonora</h2>
            <div className='flex justify-end'>
                <h3 className='text-xl md:text-2xl font-medium border-b-2 border-b-accent-light dark:border-b-accent-dark '>Music that matches your mood</h3>
            </div>
            <img src='/soundwave.svg' className=' z-0 w-full'/> 
            <p className="text-sm font-medium sm:text-base ">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium mollitia modi vitae. Nihil, fugiat. Esse sed illo nemo officiis dolore dignissimos nulla laboriosam, saepe quam iure! Pariatur ducimus maiores placeat, vel explicabo laborum eum!</p>
        </div>
  )
}

export default Banner