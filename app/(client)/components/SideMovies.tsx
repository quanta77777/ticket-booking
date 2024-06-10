import React from 'react'
import Image from 'next/image'
import { Divider, Flex, Tag } from 'antd';
import StarIcon from '@mui/icons-material/Star';
import Link from 'next/link';
import { useGetMovies } from '../../api/movie';
type Props = {}

const SideMovies = (props: Props) => {
  const {data} = useGetMovies()
  return (
    <div className=''>
      <h1 className='font-bold text-xl'>Phim đang chiếu</h1>
      {data?.map((item : any) => (
        <div className='flex p-2 border-b-2 border-gray-100 dark:border-slate-600 ' key={item?.movie_id}>
          <div className=' w-[80px] h-[100px]'>
        <Image className='object-cover w-full h-full' src={item?.image_url} width={80} height={100} alt={item?.title}/>

          </div>
        {/* <div
        className='bg-contain bg-no-repeat  w-[80px] h-[100px] object-cover'
       style={{ backgroundImage: `url("${item.image_url}")` }}
        ></div> */}
        <div className='px-3 w-1/2'>
        <Tag bordered={false} color="processing">
        16+
      </Tag>
      <Link href={`/movie/${item?.movie_id}`} className='py-1 font-semibold'>{item?.title}
        
      </Link>
      <p className='text-sm text-gray-400'>{item?.genre}</p>
      <div className='flex items-center '>
      <StarIcon className='text-yellow-400 size-4 -ml-1' />
      <p className='text-xs text-gray-400'>5.9</p>
      </div>
        </div>
      </div>
      ))}
      
      
    </div>
  )
}

export default SideMovies