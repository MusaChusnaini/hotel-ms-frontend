import Image from 'next/image'

function Logo() {
  return (
    <div>
        <Image src='/hotel-icon.png'
        alt='Logo Hotel'
        width={40}
        height={40}></Image>
    </div>
  )
}

export default Logo