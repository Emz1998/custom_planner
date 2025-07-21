import React from 'react';
import Underline from './Underline';

const Table = ({ tableHeader, rowsData }) => {
  const { columnsHeader, tableBody, blankRows = 0, variant } = rowsData;

  return variant === '2d' ? (
    <div className="table w-[50%]">
      {tableHeader && <div className="table-caption">{tableHeader}</div>}
      <div className="table-row-group">
        {tableBody.map((row, index) => (
          <div key={index} className="table-row">
            <div className="table-cell">{row}</div>
          </div>
        ))}

        {Array.from({ length: blankRows }).map((_, index) => (
          <div key={index} className="table-row">
            <div className="table-cell"></div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="table">
      {tableHeader && <div className="table-caption">{tableHeader}</div>}
      {columnsHeader && (
        <div className="table-header-group ">
          <div className="table-row">
            {columnsHeader.map((header, index) => (
              <div key={index} className="table-cell">
                {header}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="table-row-group">
        {tableBody.map((row, index) => (
          <div key={index} className="table-row">
            {row.map((cell, index) => (
              <div key={index} className="table-cell">
                {cell}
              </div>
            ))}
          </div>
        ))}

        {Array.from({ length: blankRows }).map((_, index) => (
          <div key={index} className="table-row">
            {columnsHeader &&
              Array.from({ length: columnsHeader.length }).map((_, index) => (
                <div key={index} className="table-cell blank-cell">
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
