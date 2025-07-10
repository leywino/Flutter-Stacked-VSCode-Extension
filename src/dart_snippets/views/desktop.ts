import * as _ from 'lodash';
import { Base } from '../architecture/base';

export class Desktop extends Base {
  private _dartString: string;

  constructor(fileName: string, suffix: string) {
    super(fileName, suffix);

    const originalClassName = this.className;
    const classPrefix = originalClassName.replace('Desktop', '');
    const modifiedClassName = `${classPrefix}ViewDesktop`;

    this._dartString = `import 'package:flutter/material.dart';
import 'package:stacked/stacked.dart';

import '${fileName}_viewmodel.dart';

class ${modifiedClassName} extends ViewModelWidget<${classPrefix}ViewModel> {
  const ${modifiedClassName}({super.key});

  @override
  Widget build(BuildContext context, ${classPrefix}ViewModel viewModel) {
    return const Scaffold(
      body: Center(
        child: Text('${modifiedClassName}'),
      ),
    );
  }
}
`;
  }

  get dartString(): string {
    return this._dartString;
  }
}