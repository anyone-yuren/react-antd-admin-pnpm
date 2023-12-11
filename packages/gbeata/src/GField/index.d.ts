import { GFormField } from '../GForm/g-form';
import { GSearchTableField } from '../GSearchTable/g-search-table';

declare const GField: React.ForwardRefExoticComponent<
  (GSearchTableField | GFormField) & React.RefAttributes<HTMLDivElement>
>;

export default GField;
