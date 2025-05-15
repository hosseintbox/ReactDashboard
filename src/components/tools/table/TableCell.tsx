import React from 'react';

function TableCell({ children, ...rest }: { children: any } & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div {...rest}>
            {children}
        </div>
    );
}

export default TableCell;
