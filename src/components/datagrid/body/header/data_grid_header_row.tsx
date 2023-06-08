/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import classnames from 'classnames';
import React, { CSSProperties, forwardRef } from 'react';
import { EuiDataGridControlHeaderCell } from './data_grid_control_header_cell';
import { EuiDataGridHeaderCell } from './data_grid_header_cell';
import { EuiDataGridHeaderRowProps } from '../../data_grid_types';

const EuiDataGridHeaderRow = forwardRef<
  HTMLDivElement,
  EuiDataGridHeaderRowProps
>((props, ref) => {
  const {
    leadingControlColumns = [],
    trailingControlColumns = [],
    columns,
    schema,
    lockedColumns,
    schemaDetectors,
    columnWidths,
    defaultColumnWidth,
    className,
    setColumnWidth,
    setVisibleColumns,
    switchColumnPos,
    headerIsInteractive,
    'data-test-subj': _dataTestSubj,
    ...rest
  } = props;

  const classes = classnames('euiDataGridHeader', className);
  const dataTestSubj = classnames('dataGridHeader', _dataTestSubj);
  const lockedColHeadCount = lockedColumns?.ahead || 0;
  return (
    <div
      role="row"
      ref={ref}
      className={classes}
      data-test-subj={dataTestSubj}
      {...rest}
    >
      {leadingControlColumns.map((controlColumn, index) => {
        const style: CSSProperties = {};
        if (index < lockedColHeadCount) {
          style.position = 'sticky';
          style.zIndex = 1;
          let w = 0;
          if (index > 0) {
            for (let i = 0; i < index; i++) {
              const width = leadingControlColumns[i].width;
              w += width;
            }
          }
          style.left = w;
        }
        return <EuiDataGridControlHeaderCell
          key={controlColumn.id}
          index={index}
          style={style}
          isLastSticky={index === lockedColHeadCount - 1}
          controlColumn={controlColumn}
          headerIsInteractive={headerIsInteractive}
        />
      })}
      {columns.map((column, index) => {
        const style: CSSProperties = {};
        const cIndex = index + leadingControlColumns.length;
        if (cIndex < lockedColHeadCount) {
          style.position = 'sticky';
          style.zIndex = 1;
          let w = 0;
          if (cIndex > 0) {
            const cols = [...leadingControlColumns, ...columns];
            for (let i = 0; i < cIndex; i++) {
              const col: any = cols[i];
              const id = col.id;
              const initialWidth = col.width || col.initialWidth;
              const width =
                columnWidths[id] || initialWidth || defaultColumnWidth || 100;
              w += width;
            }
          }
          style.left = w;
        }
        return <EuiDataGridHeaderCell
          key={column.id}
          column={column}
          columns={columns}
          style={style}
          index={index + leadingControlColumns.length}
          columnWidths={columnWidths}
          isLastSticky={cIndex === lockedColHeadCount - 1}
          schema={schema}
          schemaDetectors={schemaDetectors}
          setColumnWidth={setColumnWidth}
          setVisibleColumns={setVisibleColumns}
          switchColumnPos={switchColumnPos}
          defaultColumnWidth={defaultColumnWidth}
          headerIsInteractive={headerIsInteractive}
        />
      })}
      {trailingControlColumns.map((controlColumn, index) => (
        <EuiDataGridControlHeaderCell
          key={controlColumn.id}
          index={index + leadingControlColumns.length + columns.length}
          controlColumn={controlColumn}
          headerIsInteractive={headerIsInteractive}
        />
      ))}
    </div>
  );
});

EuiDataGridHeaderRow.displayName = 'EuiDataGridHeaderRow';

export { EuiDataGridHeaderRow };
