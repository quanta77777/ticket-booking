import React from 'react'
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import ListMovie from '../ListMovie/ListMovie';
type Props = {}
const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Đang chiếu',
    children: <ListMovie value={"now"}/>,
  },
  {
    key: '2',
    label: 'Sắp chiếu',
    children:  <ListMovie value={"future"}/>,
  },
  
];
const TabsMovie = (props: Props) => {
  return (
    <div className='mt-3'>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  )
}

export default TabsMovie