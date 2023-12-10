import { MwSearchTableField } from '../MwSearchTable/mw-search-table'
import { MwFormField } from '../MwForm/mw-form'

declare const MwField: React.ForwardRefExoticComponent<(MwSearchTableField | MwFormField) &
  React.RefAttributes<HTMLDivElement>>

export default MwField
