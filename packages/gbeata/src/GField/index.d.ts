import { GFormField } from '../GForm/g-form';
import { MwSearchTableField } from '../MwSearchTable/mw-search-table';

declare const GField: React.ForwardRefExoticComponent<
  (MwSearchTableField | GFormField) & React.RefAttributes<HTMLDivElement>
>;

export default GField;
