import { generateAnchor } from './extract-toc.js';
import { MDXConfigProps } from '../types/index.js';

export default function createHeading(
  CustomHeading: MDXConfigProps['components']['h1']
) {
  return ({ children }) => {
    const { id, text } = generateAnchor(children);

    // const handleClick = (
    //   e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    //   id: string
    // ) => {
    //   e.preventDefault();

    //   const element = document.getElementById(id);
    //   element?.scrollIntoView({ behavior: 'smooth' });

    //   history.pushState(null, '', `#${id}`); // Update the URL
    // };

    // return <CustomHeading id={id} onClickAnchor={handleClick}>{text}</CustomHeading>;
    return <CustomHeading id={id}>{text}</CustomHeading>;
  };
}
