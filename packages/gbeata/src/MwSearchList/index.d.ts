import { MwSearchListProps } from './mw-search-list'
import Selection from './Selection'
import SelectionAll from './SelectionAll'

declare const MwSearchList: React.ForwardRefExoticComponent<MwSearchListProps & React.RefAttributes<HTMLDivElement>> & {
  Selection?: typeof Selection
  SelectionAll?: typeof SelectionAll
}

export default MwSearchList
