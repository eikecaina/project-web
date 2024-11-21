import { Inter } from 'next/font/google';
import { Result } from 'antd';

async function Layout() {
    return (                            
      <Result
      status="404"
      title="404"
      subTitle="Ops, select a language on the top right corner to load content. If it is selected, wait 1 min to be redirected!"
      // extra={<Button type="primary">Or use english</Button>}
    />
    );
}
  

export default Layout;