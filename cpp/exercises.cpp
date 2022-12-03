#include <iostream>
#include <list>
#include <string>
#include <vector>
#include <array>
#include <valarray>
#include <map>
#include "exercises.h"

double dot(valarray<double> a, valarray<double> b) {
  int product = 0;
  for(int i=0; i<a.size(); i++)
    product += a[i] * b[i];
  return product;
}

vector<int> stretched_nonzeros(vector<int> v) {
  v.erase(std::remove(v.begin(), v.end(), 0), v.end());
  v.shrink_to_fit();
  vector<int> stretched;
  for (int i = 0; i < v.size(); i++) {
    for (int j = 0; j <= i; j++) {
      stretched.push_back(v[i]);
    }
  }
  return stretched;
}

void powers(int base, int limit, function<void(int)> consumer) {
  for (int power = 1; power <= limit; power *= base) {
    consumer(power);
  }
}

int IntStack::size() {
  int nodeCount = 0;
  if (top) {
    shared_ptr<Node> temp = top;
    nodeCount = 1;
    while((*temp).next) {
      temp = (*temp).next;
      nodeCount++;
    };
  };
  return nodeCount;
};

void IntStack::push(int item) {
  top = shared_ptr<Node>(new Node{item, top});
};

int IntStack::pop() {
  if ((*this).size() <= 0) {
    throw logic_error("stack is empty");
  }
  int popped = (*top).value;
  top = (*top).next;
  return popped;
};

string Sayer::operator()(){
  return words;
};

Sayer Sayer::operator()(string word){
  if (words == "") {
    return Sayer{word};
  }
  return Sayer{words + " " + word};
};

Sayer say;

vector<pair<string, int>> sorted_word_counts(list<string> words) {
  map<string, int> counts;
  for (string word : words) {
    counts[word]++;
  }
  auto value_descending = [](auto x, auto y) { return y.second < x.second; };
  vector<pair<string, int>> pairs(counts.begin(), counts.end());
  sort(pairs.begin(), pairs.end(), value_descending);
  return pairs;
};

Quaternion::Quaternion(double a, double b, double c, double d): a(a), b(b), c(c), d(d) {}

array<double, 4> Quaternion::coefficients(){
  return {(*this).a, (*this).b, (*this).c, (*this).d};
};

Quaternion Quaternion::operator+(const Quaternion& other){
  return Quaternion((*this).a + other.a, (*this).b + other.b, (*this).c + other.c, (*this).d + other.d);
};

Quaternion Quaternion::operator-(const Quaternion& other){
  return Quaternion((*this).a - other.a, (*this).b - other.b, (*this).c - other.c, (*this).d - other.d);
};

Quaternion Quaternion::operator*(const Quaternion& other){
  return Quaternion(
    (*this).a * other.a - (*this).b * other.b - (*this).c * other.c - (*this).d * other.d, 
    (*this).a * other.b + (*this).b * other.a + (*this).c * other.d - (*this).d * other.c, 
    (*this).a * other.c - (*this).b * other.d + (*this).c * other.a + (*this).d * other.b, 
    (*this).a * other.d + (*this).b * other.c - (*this).c * other.b + (*this).d * other.a
    );
};

bool Quaternion::operator==(const Quaternion& other) const{
  return (*this).a == other.a && (*this).b == other.b && (*this).c == other.c&& (*this).d == other.d;
};

Quaternion Quaternion::ZERO {0,0,0,0};
Quaternion Quaternion::I {0,1,0,0};
Quaternion Quaternion::J {0,0,1,0};
Quaternion Quaternion::K {0,0,0,1};

ostream& operator<<(ostream& o, Quaternion q) {
  o << q.a;
  o << (q.b >= 0 ? "+" : "");
  o << q.b;
  o << (q.c >= 0 ? "i+" : "i");
  o << q.c;
  o << (q.d >= 0 ? "j+" : "j");
  o << q.d;
  o << "k";
  return o;
};