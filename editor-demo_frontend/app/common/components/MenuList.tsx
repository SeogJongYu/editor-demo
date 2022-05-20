import {Link} from 'react-router-dom';

const menuListConfig = [
  {
    name: 'Text',
    path: 'text',
  },
  {
    name: 'Photo',
    path: 'photo',
  },
  {
    name: 'Video',
    path: 'video',
  },
  {
    name: 'Place',
    path: 'place',
  },
  {
    name: 'Icon',
    path: 'icon',
  },
  {
    name: 'Link',
    path: 'link',
  },
] as const;

export default function MenuList() {
  return (
    <div className="flex pt-4">
      {menuListConfig.map((menuItem, index) => (
        <Link
          to={`/editor/${menuItem.path}`}
          key={index}
          className="mx-3 bg-gray-300 px-3 rounded">
          {menuItem.name}
        </Link>
      ))}
    </div>
  );
}
