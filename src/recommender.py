from copy import copy, deepcopy

from sklearn.cluster import KMeans
from scipy.spatial.distance import euclidean
import pandas as pd

data = pd.read_csv('data.csv')

data = data.fillna(0)
login = data['login']


def filter_cols(cols):
    return list(filter(lambda val: val in data.columns, cols))


lang_cols = copy(list(data.columns))
lang_cols.remove('stars')
lang_cols.remove('repos')
lang_cols.remove('followers')
lang_cols.remove('following')
lang_cols.remove('contributions')
lang_cols.remove('login')

frontend = filter_cols(['JavaScript', 'HTML', 'CSS', 'TypeScript', 'ActionScript', 'Vue', 'Processing'])
backend = filter_cols(['Python', 'C#', 'Ruby', 'Go', 'Java', 'Scala', 'C++', 'PHP',
                       'PLSQL', 'PLpgSQL', 'Prolog', 'Groovy', 'Elixir'])
scripting = filter_cols(['Python', 'Shell', 'Perl', 'PowerShell', 'Lisp', 'NewLisp', 'Lua'])
embedded = filter_cols(['C', 'C++', 'Assembly', 'Arduino', 'Rust'])
science = filter_cols(['Matlab', 'R', 'Python', 'Jupyter Notebook', 'Mathcat', 'TeX', 'LaTeX'])
mobile = filter_cols(['Objective-C', 'Swift', 'Java', 'Kotlin', 'Dart'])
hardware = filter_cols(['Vala', 'Verilog', 'HCL'])

included = [*frontend, *backend, *embedded, *science, *mobile, *hardware]
other = list(filter(lambda elem: elem not in included, lang_cols))


def transform_to_class(data_):
    frontend_col_ = data_[frontend].T.sum()
    backend_col_ = data_[backend].T.sum()
    embedded_col_ = data_[embedded].T.sum()
    science_col_ = data_[science].T.sum()
    mobile_col_ = data_[mobile].T.sum()
    hardware_col_ = data_[hardware].T.sum()
    scripting_col_ = data_[scripting].T.sum()
    other_col_ = data_[other].T.sum()
    new_data_ = (
        frontend_col_,
        backend_col_,
        embedded_col_,
        science_col_,
        mobile_col_,
        hardware_col_,
        scripting_col_,
        other_col_,
        data_['stars'],
        data_['repos'],
        data_['followers'],
        data_['following'],
        data_['contributions']
    )
    return (new_data_,)


frontend_col = data[frontend].T.sum()
backend_col = data[backend].T.sum()
embedded_col = data[embedded].T.sum()
science_col = data[science].T.sum()
mobile_col = data[mobile].T.sum()
hardware_col = data[hardware].T.sum()
scripting_col = data[scripting].T.sum()
other_col = data[other].T.sum()


new_data = {
    'frontend': frontend_col,
    'backend': backend_col,
    'embedded': embedded_col,
    'science': science_col,
    'scripting': scripting_col,
    'mobile': mobile_col,
    'hardware': hardware_col,
    'other': other_col,
    'stars': data['stars'],
    'repos': data['repos'],
    'followers': data['followers'],
    'following': data['following'],
    'contributions': data['contributions']
}
old_data = deepcopy(data)
data = pd.DataFrame.from_dict(new_data)


km = KMeans(n_clusters=6)
km.fit(data)

old_data['cluster'] = km.labels_


def get_label(row):
    return km.predict(row)[0]


def get_neighbours_by_row(row):
    if not isinstance(row, pd.Series):
        row = pd.Series(row)
    row = row.drop('login')
    lb = get_label(transform_to_class(row))
    part = old_data.loc[old_data['cluster'] == lb]
    part = part.drop(['login', 'cluster'], axis=1)
    results = []
    for index, row_ in part.iterrows():
        results.append((index, euclidean(row_, row)))
    results.sort(key=lambda pair: pair[1])
    results = list(map(lambda pair: pair[0], results[:4]))
    return list(login.loc[results])


def get_neighbours_by_login(login_):
    try:
        series = old_data[old_data['login'] == login_].iloc[0]
        series.pop('cluster')
    except IndexError:
        return []
    return get_neighbours_by_row(series)


default_row = {
    'Visual Basic': 0.0,
     'HCL': 0.0,
     'Makefile': 0.0,
     'FreeMarker': 0.0,
     'Java': 0.0,
     'repos': 0,
     'Rust': 0.0,
     'GCC Machine Description': 0.0,
     'Lua': 0.0,
     'CMake': 0.0,
     'stars': 0,
     'Puppet': 0.0,
     'Haskell': 0.0,
     'C#': 0.0,
     'Assembly': 0.0,
     'Swift': 0.0,
     'Scala': 0.0,
     'Smali': 0.0,
     'Vue': 0.0,
     'PHP': 0.0,
     'HTML': 0.0,
     'Shell': 0.0,
     'Dockerfile': 0.0,
     'Emacs Lisp': 0.0,
     'login': None,
     'CoffeeScript': 0.0,
     'Scheme': 0.0,
     'Apex': 0.0,
     'Perl': 0.0,
     'PigLatin': 0.0,
     'OCaml': 0.0,
     'followers': 0,
     'Mathematica': 0.0,
     'Batchfile': 0.0,
     'Groovy': 0.0,
     'C': 0.0,
     'Objective-C': 0.0,
     'Prolog': 0.0,
     'Kotlin': 0.0,
     'Python': 0.0,
     'TypeScript': 0.0,
     'PowerShell': 0.0,
     'Verilog': 0.0,
     'PLpgSQL': 0.0,
     'ASP': 0.0,
     'TeX': 0.0,
     'Elixir': 0.0,
     'Ruby': 0.0,
     'Jupyter Notebook': 0.0,
     'Eiffel': 0.0,
     'Arduino': 0.0,
     'contributions': 0.0,
     'Vim script': 0.0,
     'Gherkin': 0.0,
     'Vala': 0.0,
     'C++': 0.0,
     'MATLAB': 0.0,
     'ActionScript': 0.0,
     'Processing': 0.0,
     'MQL4': 0.0,
     'R': 0.0,
     'XSLT': 0.0,
     'Yacc': 0.0,
     'NewLisp': 0.0,
     'PLSQL': 0.0,
     'JavaScript': 0.0,
     'Crystal': 0.0,
     'CSS': 0.0,
     'GDScript': 0.0,
     'Julia': 0.0,
     'AutoHotkey': 0.0,
     'Go': 0.0,
     'following': 0,
     'Dart': 0.0,
     'PostScript': 0.0,
     'Matlab': 0.0,
     'ColdFusion': 0.0,
     'AGS Script': 0.0,
     'VHDL': 0.0,
     'Clojure': 0.0
}

