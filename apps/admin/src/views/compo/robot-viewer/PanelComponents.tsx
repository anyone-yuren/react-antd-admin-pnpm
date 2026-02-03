import { DownOutlined, UpOutlined } from '@ant-design/icons';
import React from 'react';

interface TransformInputRowProps {
  label: string;
  axis: string;
  transformType: 'position' | 'rotation' | 'scale';
  styles: {
    transformRow: string;
    rowLabel: string;
    transformAxis: string;
    transformInput: string;
    transformRange: string;
  };
  step: number;
  min: number;
  max: number;
}

export const TransformInputRow: React.FC<TransformInputRowProps> = ({
  label,
  axis,
  transformType,
  styles,
  step,
  min,
  max,
}) => (
  <div className={styles.transformRow}>
    <label className={styles.rowLabel}>{label}</label>
    <span className={styles.transformAxis}>{axis}</span>
    <input
      className={styles.transformInput}
      type='number'
      step={step}
      min={transformType === 'scale' ? 0.01 : undefined}
      data-transform={transformType}
      data-axis={axis}
      data-kind='number'
    />
    <input
      className={styles.transformRange}
      type='range'
      step={step}
      min={min}
      max={max}
      data-transform={transformType}
      data-axis={axis}
      data-kind='range'
    />
  </div>
);

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  styles: any;
  defaultExpanded?: boolean;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
  styles,
  defaultExpanded = true,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader} onClick={() => setIsExpanded(!isExpanded)}>
        <span>{title}</span>
        {isExpanded ? <UpOutlined style={{ fontSize: 10 }} /> : <DownOutlined style={{ fontSize: 10 }} />}
      </div>
      {isExpanded && <div className={styles.sectionContent}>{children}</div>}
    </div>
  );
};

interface TransformPanelSectionProps {
  styles: any;
  transformPanelRef: React.RefObject<HTMLDivElement>;
}

export const TransformPanelSection: React.FC<TransformPanelSectionProps> = ({ styles, transformPanelRef }) => (
  <CollapsibleSection title='变换控制' styles={styles} defaultExpanded={true}>
    <div className={styles.transformPanel} ref={transformPanelRef}>
      {['x', 'y', 'z'].map((axis) => (
        <TransformInputRow
          key={`pos-${axis}`}
          label='位置'
          axis={axis}
          transformType='position'
          styles={styles}
          step={0.01}
          min={-50}
          max={50}
        />
      ))}

      {['x', 'y', 'z'].map((axis) => (
        <TransformInputRow
          key={`rot-${axis}`}
          label='旋转'
          axis={axis}
          transformType='rotation'
          styles={styles}
          step={0.1}
          min={-180}
          max={180}
        />
      ))}

      {['x', 'y', 'z'].map((axis) => (
        <TransformInputRow
          key={`scale-${axis}`}
          label='缩放'
          axis={axis}
          transformType='scale'
          styles={styles}
          step={0.01}
          min={0.01}
          max={10}
        />
      ))}
    </div>
  </CollapsibleSection>
);

interface MaterialPanelProps {
  styles: any;
  materialPanelRef: React.RefObject<HTMLDivElement>;
  materialSelectRef: React.RefObject<HTMLSelectElement>;
  colorPickerRef: React.RefObject<HTMLInputElement>;
}

export const MaterialPanel: React.FC<MaterialPanelProps> = ({
  styles,
  materialPanelRef,
  materialSelectRef,
  colorPickerRef,
}) => (
  <CollapsibleSection title='材质编辑' styles={styles} defaultExpanded={true}>
    <div ref={materialPanelRef}>
      <div className={styles.row} style={{ marginBottom: 8 }}>
        <label className={styles.rowLabel}>预设</label>
        <select className={`${styles.btn} ${styles.select}`} ref={materialSelectRef}>
          <option value='builtin-basic'>基础材质</option>
          <option value='builtin-metal'>金属材质</option>
          <option value='builtin-glass'>玻璃材质</option>
          <option value='builtin-phong'>高光材质</option>
          <option value='pbr-machined-steel'>PBR · 机床钢</option>
          <option value='pbr-brushed-aluminum'>PBR · 拉丝铝</option>
          <option value='pbr-industrial-paint'>PBR · 工业涂装</option>
          <option value='pbr-rubber'>PBR · 橡胶防护</option>
          <option value='shader-fresnel'>Shader · Fresnel</option>
          <option value='shader-grid'>Shader · Grid</option>
          <option value='shader-scanline'>Shader · Scanline</option>
        </select>
      </div>
      <div className={styles.row} style={{ marginBottom: 0 }}>
        <label className={styles.rowLabel}>颜色</label>
        <input className={`${styles.btn} ${styles.colorInput}`} type='color' ref={colorPickerRef} />
      </div>
    </div>
  </CollapsibleSection>
);
