from __future__ import division
import os
import json

from sklearn import svm

with open(os.path.join('data', 'beacon-dataset.json'), 'r') as infile:
    data = json.load(infile)

X = data['x']
Y = data['y']

model = svm.SVC()
model.fit(X, Y)

Y_predicted = model.predict(X)

num_correct = 0
for i, y_pred in enumerate(Y_predicted):
    predicted_category_id = y_pred
    true_category_id = Y[i]
    is_correct = predicted_category_id == true_category_id
    print(predicted_category_id, true_category_id, is_correct)
    num_correct += 1 if is_correct else 0

final_accuracy = num_correct / len(Y)

print('Final accuracy: {}'.format(final_accuracy))
