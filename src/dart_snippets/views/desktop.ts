import * as _ from 'lodash';
import { Base } from '../architecture/base';

export class Desktop extends Base {

  private _dartString: string;

  constructor(fileName: string, suffix: string) {
    super(fileName, suffix);

    const classPrefixList: string[] = this.className.split('Desktop');
    const classPrefix: string | undefined = classPrefixList.length > 0 ? classPrefixList[0] : undefined;

    this._dartString = `import 'package:flutter/material.dart';
import 'package:stacked/stacked.dart';

import '${fileName}_viewmodel.dart';

class ${this.className} extends ViewModelWidget<${classPrefix}ViewModel> {
  const ${this.className}({super.key});

  @override
  Widget build(BuildContext context, ${classPrefix}ViewModel viewModel) {
    return const Scaffold(
      body: Center(
        child: Text('${this.className}'),
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