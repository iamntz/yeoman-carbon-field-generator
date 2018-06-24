'use strict';

var Generator = require('yeoman-generator');
var fs = require('fs');
var rename = require("gulp-rename");
var s = require("underscore.string");


module.exports = class extends Generator {
  prompting() {
    return this.prompt([{
        type: 'input',
        name: 'project_name',
        message: 'Field name (lowercase, no spaces)',
        default: s.dasherize(this.appname.replace(/carbon(-|_)?/g, ''))
      },

      {
        type: 'input',
        name: 'project_namespace',
        message: 'Field namespace (for PHP namespacing)',
      },
      {
        type: 'input',
        name: 'composer',
        message: 'Composer naming (vendor/name)',
        default: 'n/a'
      },
      {
        type: 'input',
        name: 'project_description',
        message: 'Field description',
        default: this.appname
      },
    ]).then((answers) => {
      this.props = answers;
    });;
  }

  writing() {
    let field_name_php_camel_case = s.camelize(this.props.project_name);
    let field_name_class_php = s.classify(field_name_php_camel_case) + '_Field';

    this.registerTransformStream([
      rename((path) => {
        path.basename = path.basename.replace(/(__FIELD_NAME_CLASS_PHP__)/g, field_name_class_php);
        path.dirname = path.dirname.replace(/(__FIELD_NAME_CLASS_PHP__)/g, field_name_class_php);

        return path;
      })
    ]);

    this.fs.copyTpl(
      this.templatePath('.'),
      this.destinationPath('.'), {
        FIELD_NAMESPACE: this.props.project_namespace.replace(/(\/)/g, '\\'),
        FIELD_NAME: s.dasherize(this.props.project_name),
        FIELD_NAME_JS: s.classify(this.props.project_name).toLowerCase(),
        FIELD_NAME_PHP: field_name_php_camel_case,
        FIELD_NAME_CLASS_PHP: field_name_class_php,
        FIELD_NAME_PHP_PATH: 'CARBON_' + s.underscored(this.props.project_name).toUpperCase() + '_DIR',
        FIELD_NAME_COMPOSER: this.props.composer.replace('\\', '/'),
        FIELD_DESCRIPTION: s.clean(this.props.project_description),
        FIELD_NAME_SAMPLE: s.classify(field_name_php_camel_case).toLowerCase(),
      }
    );

    this.fs.copy(
      this.templatePath('./**/.*'),
      this.destinationRoot()
    );
  }

  install() {
    // this.spawnCommand('npm', ['install']);
    // this.spawnCommand('composer', ['install']);
  }
};
