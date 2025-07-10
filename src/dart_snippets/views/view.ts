import * as _ from 'lodash';
import { Base } from '../architecture/base';
import { TYPE_OF_ARCHITECTURE } from '../../utils/utils';

export class View extends Base {

  private _dartString: string;

  constructor(fileName: string, suffix: string, typeOfArchitecture: TYPE_OF_ARCHITECTURE) {
    super(fileName, suffix);

    let classPrefixList: string[] = this.className.split('View');
    let classPrefix: string | undefined;
    if (!_.isEmpty(classPrefixList)) { classPrefix = _.first(classPrefixList); }

    switch (typeOfArchitecture) {
      case TYPE_OF_ARCHITECTURE.Responsive: this._dartString = this.responsiveDartString(fileName, classPrefix);
        break;
      case TYPE_OF_ARCHITECTURE.Mobile: this._dartString = this.mobileDartString(fileName, classPrefix);
        break;
      default: this._dartString = this.mobileDartString(fileName, classPrefix);
        break;
    }
  }

  get dartString(): string {
    return this._dartString;
  }

  private mobileDartString(fileName: string, classPrefix?: string): string {
    return `import 'package:flutter/material.dart';
import 'package:stacked/stacked.dart';
import '${fileName}_view_model.dart';
          
class ${classPrefix}View extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ViewModelBuilder<${classPrefix}ViewModel>.reactive(
      builder: (BuildContext context, ${classPrefix}ViewModel viewModel, Widget _) {
        return Scaffold(
          appBar: AppBar(),
          body: Center(
            child: Text('${classPrefix} View'),
          ),
        );
      },
      viewModelBuilder: () => ${classPrefix}ViewModel(),
    );
  }
}
`;
  }

  private responsiveDartString(fileName: string, classPrefix?: string): string {
    return `import 'package:flutter/material.dart';
import 'package:responsive_builder/responsive_builder.dart';
import 'package:stacked/stacked.dart';

import '${fileName}_view.desktop.dart';
import '${fileName}_view.tablet.dart';
import '${fileName}_view.mobile.dart';
import '${fileName}_viewmodel.dart';

class ${classPrefix}View extends StackedView<${classPrefix}ViewModel> {
  const ${classPrefix}View({super.key});

  @override
  Widget builder(
    BuildContext context,
    ${classPrefix}ViewModel viewModel,
    Widget? child,
  ) {
    return ScreenTypeLayout.builder(
      mobile: (_) => const ${classPrefix}ViewMobile(),
      tablet: (_) => const ${classPrefix}ViewTablet(),
      desktop: (_) => const ${classPrefix}ViewDesktop(),
    );
  }

  @override
  ${classPrefix}ViewModel viewModelBuilder(BuildContext context) => ${classPrefix}ViewModel();
}
`;
  }

}