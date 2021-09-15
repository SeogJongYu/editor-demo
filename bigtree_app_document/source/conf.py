# Configuration file for the Sphinx documentation builder.
#
# This file only contains a selection of the most common options. For a full
# list see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Path setup --------------------------------------------------------------

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#
import os
import os.path
import sys
import dotenv
import django

DOCUMENT_ROOT = os.path.abspath(
    os.path.join(os.path.dirname(__file__), '../',)
)

dotenv.load_dotenv()

sys.path.insert(0, os.path.abspath('../../'))
sys.path.insert(0, os.path.abspath('./'))
os.environ['DJANGO_SETTINGS_MODULE'] = 'bigtree_app.settings'
django.setup()


# -- Project information -----------------------------------------------------

project = 'bigtree_app'
copyright = '2021, Bigtree'
author = 'Bigtree'


# -- General configuration ---------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = [
    'sphinx.ext.autodoc',
    'sphinxcontrib.apidoc',
    'sphinxcontrib.plantuml',
    'myst_parser',
]

# Add any paths that contain templates here, relative to this directory.
templates_path = ['_templates']

# The language for content autogenerated by Sphinx. Refer to documentation
# for a list of supported languages.
#
# This is also used if you do content translation via gettext catalogs.
# Usually you set "language" from the command line for these cases.
language = 'ko'

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This pattern also affects html_static_path and html_extra_path.
exclude_patterns = ['node_modules/', 'build/']


# -- Options for HTML output -------------------------------------------------

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
#
html_theme = 'sphinx_rtd_theme'

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = ['_static']


# -- sphinxcontrib-apidoc settings ------------------------------------------
apidoc_module_dir = '../../'
apidoc_output_dir = 'api_document/backend'
apidoc_excluded_paths = [
    'bigtree_app_backend/migrations/'
]
apidoc_separate_modules = True

plantuml = f"java -jar {os.path.join(DOCUMENT_ROOT, 'bin/plantuml.jar')}"

def setup(app):
    from util import process_django_model_docstring

    app.connect('autodoc-process-docstring', process_django_model_docstring)

    app.add_css_file("style.css")
