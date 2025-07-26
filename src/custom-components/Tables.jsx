import React from 'react';
import Underline from './Underline';

const Table = ({ tableHeader, rowsData }) => {
  const { columnsHeader, tableBody, blankRows = 0, variant } = rowsData;

  return variant === '2d' ? (
    <div className="custom-table">
      {tableHeader && <div className="custom-table-caption">{tableHeader}</div>}
      <div className="custom-table-row-group">
        {tableBody.map((row, index) => (
          <div key={index} className="custom-table-row">
            <div className="custom-table-cell">{row}</div>
          </div>
        ))}

        {Array.from({ length: blankRows }).map((_, index) => (
          <div key={index} className="custom-table-row">
            <div className="custom-table-cell"></div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="custom-table">
      {tableHeader && <div className="custom-table-caption">{tableHeader}</div>}
      {columnsHeader && (
        <div className="custom-table-header-group ">
          <div className="custom-table-row">
            {columnsHeader.map((header, index) => (
              <div key={index} className="custom-table-cell">
                {header}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="custom-table-row-group">
        {tableBody.map((row, index) => (
          <div key={index} className="custom-table-row">
            {row.map((cell, index) => (
              <div key={index} className="custom-table-cell">
                {cell}
              </div>
            ))}
          </div>
        ))}

        {Array.from({ length: blankRows }).map((_, index) => (
          <div key={index} className="custom-table-row">
            {columnsHeader &&
              Array.from({ length: columnsHeader.length }).map((_, index) => (
                <div key={index} className="custom-table-cell blank-cell">
                  {' '}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
