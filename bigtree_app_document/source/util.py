# Django Model에서 파라미터 자동 생성
# https://djangosnippets.org/snippets/2533/
import inspect
from django.utils.html import strip_tags
from django.utils.encoding import force_text


def process_django_model_docstring(app, what, name, obj, options, lines):
    # This causes import errors if left outside the function
    from django.db import models

    # Only look at objects that inherit from Django's base model class
    if inspect.isclass(obj) and issubclass(obj, models.Model):
        # Grab the field list from the meta class

        try:
            fields = obj._meta.get_fields()
        except AttributeError:
            return lines

        for field in fields:
            # Skip ManyToOneRel and ManyToManyRel fields which have no
            # 'verbose_name' or 'help_text'
            if not hasattr(field, 'verbose_name'):
                continue

            # Decode and strip any html out of the field's help text
            help_text = strip_tags(force_text(field.help_text))

            # Decode and capitalize the verbose name, for use if there isn't
            # any help text
            verbose_name = force_text(field.verbose_name).capitalize()

            if verbose_name:
                # Add the model field to the end of the docstring as a param
                # using the verbose name as the description
                lines.append(u':param %s: %s' % (field.name, verbose_name))
            else:
                # Add the model field to the end of the docstring as a param
                # using the help text as the description
                lines.append(u':param %s: %s' % (field.name, help_text))

            # Add the field's type to the docstring
            lines.append(u':type %s: %s' % (field.name, type(field).__name__))

    # Return the extended docstring
    return lines
