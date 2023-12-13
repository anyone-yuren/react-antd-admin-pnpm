import { GSearchListProps } from './g-search-list';
import Selection from './Selection';
import SelectionAll from './SelectionAll';

declare const GSearchList: React.ForwardRefExoticComponent<
  GSearchListProps & React.RefAttributes<HTMLDivElement>
> & {
  Selection?: typeof Selection;
  SelectionAll?: typeof SelectionAll;
};

export default GSearchList;
