import React from 'react';
declare class Inspect extends React.Component<{
    name?: string;
    value: any;
}, {
    expanded: boolean;
}> {
    state: {
        expanded: boolean;
    };
    render(): JSX.Element;
}
export default Inspect;
