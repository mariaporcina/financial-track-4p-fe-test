import { Button } from '@base-ui/react';
import type { JSX } from 'react';

import styles from '../../../../index.module.css';

type FilterButtonPropsType = {
  className: string;
  icon: JSX.Element;
  label: string;
  action: () => void;
}

const FilterButton = ({ className, icon, label, action }: FilterButtonPropsType) => {
  return (
    <Button className={`${styles.Button} flex gap-1.5 border-solid border-1 border-[#262626] bg-[#171717] font-medium ${className}`} onClick={action}> 
      {icon}
      <span className="text-white text-sm">{label}</span>
    </Button>
  )
}

export default FilterButton;
