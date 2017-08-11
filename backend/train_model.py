from __future__ import division
import os
import json

from sklearn import svm

with open(os.path.join('data', 'beacon-dataset.json'), 'r') as infile:
    data = json.load(infile)

x = data['x']  # input: signal strengths
y = data['y']  # output: area id

model = svm.SVC()
model.fit(x, y)

predictions = model.predict(x)

num_correct_predictions = 0
for i, y_predicted in enumerate(predictions):
    predicted_category_id = y_predicted
    true_category_id = y[i]
    is_prediction_correct = predicted_category_id == true_category_id
    print(predicted_category_id, true_category_id, is_prediction_correct)
    num_correct_predictions += 1 if is_prediction_correct else 0

final_accuracy = num_correct_predictions / len(y)

print('Final training accuracy: {}'.format(final_accuracy))
