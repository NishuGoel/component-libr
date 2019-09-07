import { FunctionComponent } from 'react';
declare type DateTypeKnobValue = string[];
export interface FileTypeKnob {
    name: string;
    accept: string;
    value: DateTypeKnobValue;
}
export interface FilesTypeProps {
    knob: FileTypeKnob;
    onChange: (value: DateTypeKnobValue) => DateTypeKnobValue;
}
declare const serialize: () => undefined;
declare const deserialize: () => undefined;
declare const FilesType: FunctionComponent<FilesTypeProps> & {
    serialize: typeof serialize;
    deserialize: typeof deserialize;
};
export default FilesType;
